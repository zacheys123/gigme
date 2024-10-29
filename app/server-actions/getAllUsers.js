// export async function getAllUsers(id) {
//   console.log(id);

//   try {
//     // Create response with no-store cache
//     const response = await fetch("/api/user/getAllusers", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     });

//     return response;
//   } catch (error) {
//     console.log("error getting all users in get All User", error);
//   }
// }

// export async function GET(request) {
//   try {
//     await connectDb();

//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     const users = await User.find({ _id: { $ne: id } });

//     const response = NextResponse.json(users, { status: 200 });
//     response.headers.set("Cache-Control", "no-store");

//     return response;
//   } catch (error) {
//     return NextResponse.json({ message: error }, { status: 500 });
//   }
// }
