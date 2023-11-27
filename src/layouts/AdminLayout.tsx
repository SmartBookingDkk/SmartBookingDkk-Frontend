import AdminSidebarProvider from '@/contexts/AdminSidebarContext';
import { Rubik } from 'next/font/google'
import AdminPanel from '@/components/AdminPanel/AdminPanel';

const rubik = Rubik({
  weight: '400',
  subsets: ['latin'],
})

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminSidebarProvider className={rubik.className}>
      <AdminPanel>
        {children}
      </AdminPanel>
    </AdminSidebarProvider>
  )
}