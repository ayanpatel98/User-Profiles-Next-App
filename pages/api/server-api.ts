import { User } from '@/app/models/user';
import { NextApiRequest, NextApiResponse } from 'next';

// Variable to cache user data
let cachedUsers: User[] = [];

/**
 * Function to fetch users from an Mock API and cache the API response.
 * @params None
 * @returns Promise<User[]> Array of users
 */
const fetchUsers = async (): Promise<User[]> => {
    if (cachedUsers.length === 0) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            cachedUsers = await response.json();
            cachedUsers = await cachedUsers.map((user: User) => 
            ({ ...user, isLiked: false, likes: Math.floor(Math.random() * 1000) })
            );
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    return cachedUsers;
};

/**
 * Function to increment or decrement the like count for a user.
 * It also toggles on and off the like variable which is mapped with the like button
 * 
 * @param {number} userId The ID of the user
 * @param {boolean} currentLiked The current liked status of the user
 * @param {number} currentLikes The current like count of the user
 * @returns void
 */
const incrementDecrementLike = (userId: number, currentLiked: boolean, currentLikes: number): void => {
    const userIndex = cachedUsers.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        cachedUsers[userIndex] = {
            ...cachedUsers[userIndex], likes: currentLiked ? currentLikes - 1 : currentLikes + 1,
            isLiked: !currentLiked
        };
    }
};

/**
 * Function to get user details by ID.
 *
 * @param {number} userId The ID of the user
 * @returns User | undefined The user object or undefined if not found
 */
const getUserDetails = (userId: number): User | undefined => {
    return cachedUsers.find(user => user.id === userId);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET' && req.query.id) {
        const userId: number = Number(String(req.query.id));
        try {
            const userDetails: User | undefined = getUserDetails(userId);

            if (userDetails) {
                res.status(200).json(userDetails);
            } else {
                res.status(404).json({ error: 'No User found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error, Not able to get User Details.' });
        }
    }
    else if (req.method === 'GET') {
        try {
            const users = await fetchUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error, Error fetching users.' });
        }
    }
    else if (req.method === 'POST') {
        const { userId, currentLiked, currentLikes }: { userId: number; currentLiked: boolean; currentLikes: number } = req.body;
        try {
            incrementDecrementLike(userId, currentLiked, currentLikes);
            res.status(200).json({ message: 'Like updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error, Error fetching users' });
        }
    }
    else {
        res.status(405).end('Method Not Allowed');
    }
}
