import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserSearch } from "@/hooks/useUserSearch";
import { useDebounce } from "@/hooks/useDebounce";
import AddUserModal from "../Organisms/AddUserModal";

interface UserSelectProps {
  value?: string;
  onChange: (value: string) => void;
}

export default function UserSelect({ value, onChange }: UserSelectProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const { data: users = [], isLoading } = useUserSearch(debouncedSearch);

  const selectedUser = users.find((user) => user.id === value);

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => {
              // Delay hiding dropdown to allow click events
              setTimeout(() => setShowDropdown(false), 200);
            }}
          />
          {showDropdown && (
            <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
              {isLoading ? (
                <div className="p-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full mt-2" />
                </div>
              ) : users.length > 0 ? (
                <div className="py-1">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        value === user.id ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => {
                        onChange(value === user.id ? '' : user.id);
                        setSearch('');
                        setShowDropdown(false);
                      }}
                    >
                      {user.email} ({user.fName} {user.lName})
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-2 text-gray-500">No users found</div>
              )}
            </div>
          )}
        </div>
        <AddUserModal
          isOpen={false}
          onClose={() => {}}
          onUserCreated={(user) => {
            onChange(user.id);
            setSearch('');
          }}
        />
      </div>
      {selectedUser && !showDropdown && (
        <div className="mt-2 text-sm text-gray-600">
          Selected: {selectedUser.email} ({selectedUser.fName} {selectedUser.lName})
        </div>
      )}
    </div>
  );
}
