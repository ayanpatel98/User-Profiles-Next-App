import "../../app/globals.css"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserDetails } from "@/app/services/api";
import Link from "next/link";

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (id) {
        const user = getUserDetails(parseInt(id as string));
        setUserDetails(user);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!userDetails) {
    return (
        <>
          <div>User Data Not available</div>
          <Link href={'/home'}><button>Go Back</button></Link>
        </>
      );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">User Details</h1>
      <div className="border rounded p-4 text-center">
        <p>ID: {userDetails.id}</p>
        <p>Name: {userDetails.name}</p>
        <p>Username: {userDetails.username}</p>
        <p>Email: {userDetails.email}</p>
        <p>Address:</p>
        <ul>
          <li>Street: {userDetails.address.street}</li>
          <li>Suite: {userDetails.address.suite}</li>
          <li>City: {userDetails.address.city}</li>
          <li>Zipcode: {userDetails.address.zipcode}</li>
        </ul>
        <p>Phone: {userDetails.phone}</p>
        <p>Website: {userDetails.website}</p>
        <p>Company:</p>
        <ul>
          <li>Name: {userDetails.company.name}</li>
          <li>Catchphrase: {userDetails.company.catchPhrase}</li>
          <li>BS: {userDetails.company.bs}</li>
        </ul>
        <Link href={'/home'}><button>Go Back</button></Link>
      </div>
    </div>
  );
};

export default UserDetail;