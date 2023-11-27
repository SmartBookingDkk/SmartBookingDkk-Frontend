import  CalendarWeekView  from '@/components/weekcalendar/CalendarWeekView';

export default function CalendarMonthPage() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <CalendarWeekView/>
      </main>
    );
}