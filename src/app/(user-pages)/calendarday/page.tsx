import  CalendarDayView  from '@/components/daycalendar/CalendarDayView';

export default function CalendarMonthPage() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <CalendarDayView/>
      </main>
    );
}