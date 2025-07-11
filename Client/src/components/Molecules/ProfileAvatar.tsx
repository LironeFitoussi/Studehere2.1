import { User as UserIcon } from "lucide-react";

interface ProfileAvatarProps {
    className?: string;
}

export function ProfileAvatar({ className = "" }: ProfileAvatarProps) {
    return (
        <div className={`flex-shrink-0 ${className}`}>
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border">
                <UserIcon className="w-12 h-12 text-muted-foreground" />
            </div>
        </div>
    );
} 