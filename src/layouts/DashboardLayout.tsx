import DashboardSidebarProvider from '@/contexts/DashboardSidebarContext';
import { Rubik } from 'next/font/google'
import DashboardPanel from '@/components/DashboardPanel/DashboardPanel';

const rubik = Rubik({
  weight: '400',
  subsets: ['latin'],
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardSidebarProvider className={rubik.className}>
      <DashboardPanel>
        {children}
      </DashboardPanel>
    </DashboardSidebarProvider>
  )
}