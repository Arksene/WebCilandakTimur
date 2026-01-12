import Swal from "sweetalert2";

export const confirmAlert = async (message, text = "") => {
  const result = await Swal.fire({
    icon: "question",
    title: "Konfirmasi",
    text: message || text,
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Tidak",
    confirmButtonColor: "#0f172a",
    cancelButtonColor: "#be123c",
  });

  return result.isConfirmed;
};
export const alertSuccess = async (message) => {
  return Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: message,
  });
};

export const alertError = async (message) => {
  return Swal.fire({
    icon: "error",
    title: "Gagal",
    text: message,
  });
};
