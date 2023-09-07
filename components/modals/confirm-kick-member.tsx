import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useConfirmModal } from '@/hooks/use-confirm-modal-store'

export default function ConfirmKickMemberModal({
  onResult,
}: {
  onResult: (res: boolean) => void
}) {
  const { isOpen, onClose } = useConfirmModal()

  return (
    <AlertDialog open={isOpen} onOpenChange={() => onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              onClose()
              onResult(false)
            }}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() => {
              onClose()
              onResult(true)
            }}
          >
            Kick
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
