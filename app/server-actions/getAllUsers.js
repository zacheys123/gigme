import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { checkEnvironment } from "@/utils";

// export async function getAllUsers() {
//   const { userId } = auth();
//   const res = await fetch(
//     `${checkEnvironment()}/api/user/getAllusers/${userId}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const { currentuser } = await res.json();
//   console.log(currentuser);
//   return currentuser;
// }

// export const getAllUsers = async (userId) => {
//   try {
//     const res = await fetch(
//       `${checkEnvironment()}/api/user/getAllusers/${userId}}`
//     );
//     const data = await res.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export async function getAllUsers(id) {
  console.log(id);

  try {
    await connectDb();

    const users = await User.find({ _id: { $ne: id } });

    return users;
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
