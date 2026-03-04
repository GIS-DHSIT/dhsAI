import { Chip } from "@mui/material";

const StatusChip = ({ status }) => {
  const color =
    status === "Success"
      ? "success"
      : status === "Failed"
      ? "error"
      : "warning";

  return <Chip label={status} color={color} size="small" />;
};

export default StatusChip;