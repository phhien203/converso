import NonMemberNavigationSidebar from '@/components/navigation/non-member-navigation-sidebar'

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-30 flex h-full w-[72px] flex-col">
        <NonMemberNavigationSidebar />
      </div>

      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  )
}
