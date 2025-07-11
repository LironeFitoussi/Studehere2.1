import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

// Types
import type { IUser, ICreateUserGlobal } from "@/types";

// API
import { createUser } from "@/api/userService";

export default function AddUserForms({ 
  onSuccess 
}: { 
  onSuccess: (user: IUser) => void 
}) {
  const [formData, setFormData] = useState<ICreateUserGlobal>({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    role: "user",
  });

  const { mutate: createNewUser, isPending: isSubmitting } = useMutation({
    mutationFn: (userData: ICreateUserGlobal) => createUser(userData),
    onSuccess: (createdUser) => {
      toast.success("User created successfully!");
      onSuccess(createdUser);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create user");
      console.error("Failed to create user:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.fName || !formData.lName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    createNewUser(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fName">First Name *</Label>
          <Input
            id="fName"
            name="fName"
            value={formData.fName}
            onChange={handleChange}
            placeholder="John"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label htmlFor="lName">Last Name *</Label>
          <Input
            id="lName"
            name="lName"
            value={formData.lName}
            onChange={handleChange}
            placeholder="Doe"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john.doe@example.com"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(555) 123-4567"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="123 Main St"
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="New York"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="NY"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <Select
          value={formData.role}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, role: value }))
          }
          disabled={isSubmitting}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create User"}
      </Button>
    </form>
  );
}
