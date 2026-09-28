import { DialogueCircle } from '../types';

/**
 * Parses a textual meeting cadence string and generates next meeting dates.
 */
function getNextMeetingDate(meetingTimeStr: string): { start: Date; end: Date } {
  const now = new Date();
  // Default to next Saturday at 14:00 UTC or 7 days from now
  const nextDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  nextDate.setHours(14, 0, 0, 0);

  // Check if there is a specific time mentioned (e.g., 10:00 AM, 6:30 PM, 5:00 PM)
  const timeMatch = meetingTimeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (timeMatch) {
    let hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const meridiem = timeMatch[3]?.toUpperCase();

    if (meridiem === 'PM' && hours < 12) hours += 12;
    if (meridiem === 'AM' && hours === 12) hours = 0;

    nextDate.setHours(hours, minutes, 0, 0);
  }

  const endDate = new Date(nextDate.getTime() + 90 * 60 * 1000); // 90 min duration
  return { start: nextDate, end: endDate };
}

function formatDateToICS(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Generates an RFC 5545 compliant .ics string and triggers a browser download.
 */
export function exportCircleToICS(circle: DialogueCircle): void {
  const { start, end } = getNextMeetingDate(circle.meetingTime);
  const now = new Date();

  const uid = `circle-${circle.id}-${Date.now()}@sharedfuture.org`;
  const dtStamp = formatDateToICS(now);
  const dtStart = formatDateToICS(start);
  const dtEnd = formatDateToICS(end);

  // Retrieve agenda topics if available
  let agendaLines: string[] = [];
  try {
    const saved = localStorage.getItem(`shared_future_agenda_${circle.id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.themeTitle) {
        agendaLines.push(``, `Upcoming Session Theme: ${parsed.themeTitle}`);
      }
      if (Array.isArray(parsed?.discussionPoints)) {
        const included = parsed.discussionPoints.filter((p: any) => p.status === 'included');
        if (included.length > 0) {
          agendaLines.push(``, `Meeting Agenda & Discussion Topics:`);
          included.forEach((p: any, i: number) => {
            agendaLines.push(`${i + 1}. [${p.durationMinutes}m] ${p.title} (${p.category})`);
          });
        }
      }
    }
  } catch (e) {
    // ignore
  }

  const cleanDescription = [
    `The Shared Future Project — Dialogue Circle`,
    `Focus: ${circle.topic}`,
    `Cadence: ${circle.meetingTime}`,
    `Host / Facilitator: ${circle.contactPerson}`,
    `Format: ${circle.format.toUpperCase()} (${circle.city}, ${circle.country})`,
    `Languages: ${circle.languages.join(', ')}`,
    ...agendaLines,
    ``,
    `About this Circle:`,
    circle.description,
    ``,
    `Ground Rules:`,
    `- Deep active listening & Chatham House Rule`,
    `- Suspend premature judgment; speak from personal lived experience`,
    `- Committed to transforming rivals into community partners.`
  ].join('\\n');

  const location = circle.format === 'online'
    ? 'Virtual Meeting (Dialogue Circles Secure Space)'
    : `${circle.city}, ${circle.country} (${circle.format})`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Shared Future Project//Dialogue Circles//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    'RRULE:FREQ=MONTHLY;INTERVAL=1',
    `SUMMARY:[Shared Future] ${circle.name} — Monthly Dialogue`,
    `DESCRIPTION:${cleanDescription}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Shared Future Dialogue Circle meeting today',
    'TRIGGER:-PT1H',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  const fileName = `${circle.name.replace(/[^a-zA-Z0-9_-]/g, '_')}_Dialogue_Circle.ics`;
  anchor.setAttribute('download', fileName);
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
