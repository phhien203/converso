import NavigationSidebar from '@/components/navigation/navigation-sidebar'
import ServerSidebar from '@/components/server/server-sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'

export default function MobileToggle({ serverId }: { serverId: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex gap-0 p-0" side="left">
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>

        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  )
}
