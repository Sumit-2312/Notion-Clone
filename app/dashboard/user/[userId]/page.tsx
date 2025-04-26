"use client"

import { Button } from "@/components/ui/button";
import { Plus, Trash2, RefreshCcw } from "lucide-react";
import { useRef, useState } from "react";

const Workspace = ({ params }: { params: { userId: string } }) => {

    const { userId } = params;
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDivClick = () => {
        if (!imageSrc) {
            fileInputRef.current?.click(); // open file picker only if no image
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setImageSrc(null);
    };

    const handleChangeImage = () => {
        fileInputRef.current?.click(); // trigger file picker again
    };

    return ( 
        <div className="text-white h-[200vh] w-full flex flex-col relative pt-20">

            <div className="navbar flex gap-5 items-center justify-end pt-3 px-3 fixed top-0 right-0 z-10">
                <Button className="text-black hover:cursor-pointer hover:bg-gray-600 hover:text-white font-bold bg-white">
                    Publish
                </Button>
                <Button className="text-black hover:cursor-pointer hover:bg-gray-600 hover:text-white font-bold bg-white">
                    Log out
                </Button>
            </div>

            <div 
                className="h-72 w-full group relative hover:border border-t-gray-500 hover:bg-gradient-to-tr hover:cursor-pointer from-gray-800 to-gray-900 border-b-gray-500 overflow-hidden"
                onClick={handleDivClick}
            >
                {imageSrc ? (
                    <>
                        <img
                            src={imageSrc}
                            alt="Uploaded"
                            className="w-full h-full object-cover"
                        />
                        {/* Buttons on hover */}
                        <div className="absolute inset-0 bg-opacity-30 hidden group-hover:flex items-center justify-center gap-4">
                            <Button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleChangeImage();
                                }}
                                className="bg-white text-black hover:bg-gray-700 hover:text-white"
                            >
                                <RefreshCcw className="mr-2" size={16}/> Change
                            </Button>
                            <Button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteImage();
                                }}
                                variant="destructive"
                            >
                                <Trash2 className="mr-2" size={16}/> Delete
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="hidden group-hover:flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Plus className="size-10" />
                        <p className="text-gray-300 text-sm">Click anywhere to add image</p>
                    </div>
                )}

                {/* Hidden input */}
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </div>

        </div>
    );
}
 
export default Workspace;
