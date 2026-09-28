import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DialogueCircle } from '../types';
import { Globe, ZoomIn, ZoomOut, Maximize2, MapPin } from 'lucide-react';

interface DialogueCirclesMapProps {
  circles: DialogueCircle[];
  selectedCircleId?: string | null;
  joinedCircleIds: string[];
  onSelectCircle: (circle: DialogueCircle) => void;
  onJoinCircle: (circleId: string) => void;
  onExportCalendar: (circle: DialogueCircle) => void;
}

export const DialogueCirclesMap: React.FC<DialogueCirclesMapProps> = ({
  circles,
  selectedCircleId,
  joinedCircleIds,
  onSelectCircle,
  onJoinCircle,
  onExportCalendar,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy prior map instance if re-initializing
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [20, 10],
      zoom: 2.2,
      minZoom: 2,
      maxZoom: 16,
      zoomControl: false,
      worldCopyJump: true,
      attributionControl: true,
    });

    // CartoDB Voyager tiles (clean, beautiful, high-contrast, cartographic standard)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers whenever circles or joined states change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    const validBounds: L.LatLngTuple[] = [];

    circles.forEach((circle) => {
      if (!circle.coordinates) return;

      const { lat, lng } = circle.coordinates;
      validBounds.push([lat, lng]);

      const isJoined = joinedCircleIds.includes(circle.id);
      const isSelected = selectedCircleId === circle.id;

      // Determine pin color and styling based on format & joined status
      let pinBg = '#0A2463'; // Navy default
      let pinRing = 'rgba(10, 36, 99, 0.2)';
      if (circle.format === 'online') {
        pinBg = '#1E6091'; // Blue
        pinRing = 'rgba(30, 96, 145, 0.25)';
      } else if (circle.format === 'hybrid') {
        pinBg = '#2D6A4F'; // Forest green
        pinRing = 'rgba(45, 106, 79, 0.25)';
      }

      const customHtml = `
        <div style="position: relative; width: 34px; height: 42px; cursor: pointer;">
          ${isSelected || isJoined ? `
            <div style="
              position: absolute;
              top: -4px;
              left: -4px;
              width: 42px;
              height: 42px;
              border-radius: 50%;
              background: ${pinRing};
              animation: pulse 2s infinite;
            "></div>
          ` : ''}
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 34px;
            height: 34px;
            border-radius: 50% 50% 50% 0;
            background: ${isJoined ? '#059669' : pinBg};
            transform: rotate(-45deg);
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <span style="
              transform: rotate(45deg);
              color: #ffffff;
              font-family: sans-serif;
              font-size: 11px;
              font-weight: bold;
            ">${circle.membersCount}</span>
          </div>
          ${isJoined ? `
            <div style="
              position: absolute;
              top: -3px;
              right: -3px;
              background: #D4A017;
              color: #000;
              width: 14px;
              height: 14px;
              border-radius: 50%;
              border: 1.5px solid #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 9px;
              font-weight: bold;
            ">✓</div>
          ` : ''}
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: customHtml,
        iconSize: [34, 42],
        iconAnchor: [17, 42],
        popupAnchor: [0, -38]
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      // Popup Content
      const popupHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 2px; min-width: 230px; max-width: 280px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
            <span style="
              font-size: 9px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              padding: 2px 6px;
              border-radius: 9999px;
              background: ${circle.format === 'in-person' ? '#ecfdf5; color: #065f46;' : circle.format === 'online' ? '#eff6ff; color: #1e40af;' : '#f0fdf4; color: #166534;'}
            ">${circle.format}</span>
            <span style="font-size: 11px; color: #6b7280; font-weight: 600;">
              ${circle.membersCount}/${circle.maxMembers} Members
            </span>
          </div>

          <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0a2463; line-height: 1.25;">
            ${circle.name}
          </h4>

          <div style="font-size: 11px; color: #4b5563; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
            <span>📍 ${circle.city}, ${circle.country}</span>
          </div>

          <p style="margin: 0 0 8px 0; font-size: 11px; color: #6b7280; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${circle.description}
          </p>

          <div style="background: #f8fafc; padding: 6px 8px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 10px; margin-bottom: 8px;">
            <div style="color: #0a2463; font-weight: 600; margin-bottom: 2px;">
              🗓️ ${circle.meetingTime}
            </div>
            <div style="color: #047857;">
              🎯 Focus: ${circle.topic}
            </div>
          </div>

          <div style="display: flex; gap: 6px; margin-top: 6px;">
            <button id="map-btn-select-${circle.id}" style="
              flex: 1;
              background: #0a2463;
              color: #ffffff;
              border: none;
              padding: 6px 8px;
              border-radius: 6px;
              font-size: 11px;
              font-weight: 600;
              cursor: pointer;
            ">
              ${isJoined ? 'Open Chat & Archive' : 'Details & Join'}
            </button>
            <button id="map-btn-cal-${circle.id}" title="Export .ics calendar" style="
              background: #f1f5f9;
              color: #0a2463;
              border: 1px solid #cbd5e1;
              padding: 6px 8px;
              border-radius: 6px;
              font-size: 11px;
              font-weight: 600;
              cursor: pointer;
            ">
              📅 .ics
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      // Attach DOM events after popup opens
      marker.on('popupopen', () => {
        const selectBtn = document.getElementById(`map-btn-select-${circle.id}`);
        const calBtn = document.getElementById(`map-btn-cal-${circle.id}`);

        if (selectBtn) {
          selectBtn.onclick = () => {
            onSelectCircle(circle);
          };
        }
        if (calBtn) {
          calBtn.onclick = () => {
            onExportCalendar(circle);
          };
        }
      });

      markersRef.current[circle.id] = marker;
    });

    // If specific circle was selected, center and open popup
    if (selectedCircleId && markersRef.current[selectedCircleId]) {
      const activeMarker = markersRef.current[selectedCircleId];
      map.setView(activeMarker.getLatLng(), 6, { animate: true });
      setTimeout(() => {
        activeMarker.openPopup();
      }, 300);
    }
  }, [circles, joinedCircleIds, selectedCircleId, onSelectCircle, onExportCalendar]);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleFitAll = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const coords: L.LatLngTuple[] = circles
      .filter(c => c.coordinates)
      .map(c => [c.coordinates!.lat, c.coordinates!.lng]);

    if (coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 8 });
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-gray-300 shadow-sm bg-gray-100">
      {/* Map Canvas Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-[460px] sm:h-[500px] z-10"
        style={{ background: '#E5E9EE' }}
      />

      {/* Floating Header Overlay */}
      <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-gray-200 shadow-md flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#0A2463] text-white flex items-center justify-center">
          <Globe className="w-4 h-4 text-[#D4A017]" />
        </div>
        <div>
          <div className="text-xs font-sans font-bold text-[#0A2463] flex items-center gap-1.5">
            <span>Global Dialogue Circle Network</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p className="text-[11px] text-gray-500 font-sans">
            {circles.filter(c => c.coordinates).length} active verified geographic hubs
          </p>
        </div>
      </div>

      {/* Map Custom Controls (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 shadow-md">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="w-9 h-9 bg-white hover:bg-gray-50 text-[#0A2463] font-bold rounded-lg border border-gray-200 flex items-center justify-center transition-colors active:scale-95"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="w-9 h-9 bg-white hover:bg-gray-50 text-[#0A2463] font-bold rounded-lg border border-gray-200 flex items-center justify-center transition-colors active:scale-95"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleFitAll}
          title="Fit All Circles Globally"
          className="w-9 h-9 bg-white hover:bg-gray-50 text-[#0A2463] font-bold rounded-lg border border-gray-200 flex items-center justify-center transition-colors active:scale-95"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Map Legend Overlay (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-gray-200 shadow-sm flex flex-wrap items-center gap-3 text-[11px] font-sans">
        <div className="flex items-center gap-1.5 text-gray-700 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0A2463]"></span>
          <span>In-Person</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-700 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F]"></span>
          <span>Hybrid Hub</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-700 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1E6091]"></span>
          <span>Online / Global</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          <span>✓ Joined</span>
        </div>
      </div>
    </div>
  );
};
