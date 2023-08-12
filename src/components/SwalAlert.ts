import Swal, { SweetAlertOptions } from "sweetalert2";

export default function DarkModal(options: SweetAlertOptions) {
    Swal.fire({ ...options, background: "#292c32", color: "#fff" });
}
