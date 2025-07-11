import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Components
import AddUserForms from "../Molecules/AddUserForms";

// Types
import type { IUser } from "@/types";

export default function AddUserModal({
  isOpen,
  onClose,
  onUserCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated?: (user: IUser) => void;
}) {
  const handleSuccess = (user: IUser) => {
    if (onUserCreated) {
      onUserCreated(user);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Fill in the user details below to create a new user account.
          </DialogDescription>
        </DialogHeader>
        <AddUserForms onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
