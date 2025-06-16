import { createPortal } from "react-dom";

interface CenterDisplayProps {
    showOn: boolean,
    children: any,
}

export default function CenterDisplay({ showOn, children }: CenterDisplayProps) {
    return (<>
        {showOn && createPortal(
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none w-auto ">
                <div className="max-w-1/2">
                    {children}
                </div>
            </div>,
            document.body
        )}
    </>);
}