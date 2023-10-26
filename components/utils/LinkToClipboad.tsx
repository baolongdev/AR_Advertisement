import { toast } from "react-toastify";

export function copyCodeToClipboard(url) {
    // Create a temporary input element to copy text to clipboard
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    // Notify the user that the text has been copied
    toast.success('Sao chép thành công!');
}