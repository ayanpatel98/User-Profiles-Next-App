let cachedUsers: any = [];

export const fetchUsers = async () => {
  if (cachedUsers.length === 0) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      cachedUsers = data.map((user: any) => ({ ...user, liked: false, likes: Math.floor(Math.random() * 1000) }));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  
  return cachedUsers;
};

export const incrementDecrementLike = (userId: number, currentLiked: boolean, currentLikes: number) => {
  cachedUsers = cachedUsers.map((user: any) => {
    if (user.id === userId) {
      if(!currentLiked) return { ...user, likes: currentLikes + 1, liked: !currentLiked };

      else return { ...user, likes: currentLikes - 1, liked: !currentLiked };
    }
    return user;
  });
};

export const getUserDetails = (userId: number) => {
  return cachedUsers.find((user: any) => user.id === userId);
};