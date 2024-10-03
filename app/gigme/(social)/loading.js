import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center opacity-30">
      <CircularProgress size="19px" sx={{ color: "blue" }} />
    </div>
  );
}
