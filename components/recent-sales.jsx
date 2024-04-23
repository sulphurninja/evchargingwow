import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useEffect, useState } from "react";

export function RecentSales() {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get('/api/getUsers');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUsersData();
  }, []);
  
  return (
    <div className="space-y-8">
      {userData.map((user, index) => (
        <div key={user._id} className="flex items-center">
          <Avatar className="h-6 w-6 text-center">
          <h1 className="text-xl text-center">{index + 1}</h1>

          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto font-medium">{user.customerId}</div>
        </div>
      ))}
    </div>
  );
}
