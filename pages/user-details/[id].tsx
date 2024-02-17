import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import { User } from "@/app/models/user";
import Head from 'next/head';
import "../../app/globals.css"

const UserDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (id) {
        try {
          // Fetch user details from the server API based on the 'id' parameter
          const response = await fetch(`/api/server-api?id=${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
          const userData: User = await response.json();

          setUserDetails(userData);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, [id]); // Dependency array with 'id' as a dependency

  // Rendering based on whether the user details are available or not
  if (!userDetails) {
    return (
      <div className="container h-full mx-auto py-8 text-center">
        <Head>
          <title>User Profile Details</title>
        </Head>
        <div>
          <h1 className='text-3xl font-bold'>User Data Not available</h1>
          <Link href={'/home'}>
            <button className='bg-blue-500 rounded text-white px-2 py-1 mt-5'>Go to Home Page</button>
          </Link>
        </div>
      </div>
    );
  }

  // Render the details if they are available
  return (
    <>
      <h1 className="text-3xl text-center font-bold mt-5 mb-3">User Details</h1>
      <Head>
        <title>User Profile Details</title>
      </Head>
      <div className="container flex flex-col items-center justify-center mx-auto py-8">
        <div className="border rounded shadow-2xl lg:w-2/4 sm:w-full p-4">
          <div className='pb-2'>
            <p><b>Name:</b> {userDetails.name}</p>
            <p><b>Username:</b> {userDetails.username}</p>
            <p><b>Email:</b> {userDetails.email}</p>
          </div>

          <div className='pt-2 pb-2 border-solid border-t-2 border-b-2'>
            <p className='text-center font-bold'>Address</p>
            <ul>
              <li><b>Street:</b> {userDetails.address.street}</li>
              <li><b>Suite:</b> {userDetails.address.suite}</li>
              <li><b>City:</b> {userDetails.address.city}</li>
              <li><b>Zipcode:</b> {userDetails.address.zipcode}</li>
            </ul>
            <p><b>Phone:</b> {userDetails.phone}</p>
            <p><b>Website:</b> {userDetails.website}</p>
          </div>

          <div className='pt-2'>
            <p className='text-center font-bold'>Company Details:</p>
            <ul>
              <li><b>Name:</b> {userDetails.company.name}</li>
              <li><b>Catchphrase:</b> {userDetails.company.catchPhrase}</li>
              <li><b>Business Service:</b> {userDetails.company.bs}</li>
            </ul>
          </div>
        </div>
        <Link href={'/home'}>
          <button className='bg-blue-500 rounded text-white px-2 py-1 mt-5'>Go to Home Page</button>
        </Link>
      </div>
    </>
  );
};

export default UserDetail;