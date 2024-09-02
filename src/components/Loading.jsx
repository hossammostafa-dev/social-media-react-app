import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Loading = () => {
  return (
    <>
      <Stack spacing={1} mt={"20%"}>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Skeleton variant="circular" width={50} height={50} />
          <Box width={"80%"}>
            <Skeleton
              variant="text"
              width={"80%"}
              height={15}
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              width={"40%"}
              height={15}
              sx={{ fontSize: "1rem" }}
            />
          </Box>
        </Stack>

        <Skeleton variant="rectangular" width={"100%"} height={250} />
        <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" width={"40%"} sx={{ fontSize: "1rem" }} />
      </Stack>
    </>
  );
};

export default Loading;
