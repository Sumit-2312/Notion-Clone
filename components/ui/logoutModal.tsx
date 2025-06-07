import { signOut } from "next-auth/react";
import { Button } from "./button";

export default function LogoutModal({
  setclicked,
}: {
  setclicked: (value: boolean) => void;
}) {
  // Handle click on overlay to close modal
  function handleOverlayClick() {
    setclicked(false);
  }

  // Prevent clicks inside modal content from closing modal
  function handleModalClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center  bg-transparent backdrop-blur-xs z-50"
    >
      <div
        onClick={handleModalClick}
        className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg text-black flex flex-col gap-6 relative"
      >
        <button
          onClick={() => setclicked(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        <p className="text-xl font-semibold text-center">Are you sure?</p>

        <div className="flex justify-center gap-6">
          <Button
            onClick={() => setclicked(false)}
            className="bg-green-500 hover:bg-green-600 text-white"
            variant={"outline"}
          >
            No
          </Button>
          <Button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white"
            variant={"outline"}
          >
            Yes
          </Button>
        </div>
      </div>

    </div>
  );
}
