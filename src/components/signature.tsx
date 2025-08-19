import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignatureField({ onChange }: { onChange: (data: string) => void }) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [savedSignature, setSavedSignature] = useState<string | null>(null);

  const clear = () => sigCanvas.current?.clear();

  const save = () => {
    if (sigCanvas.current) {
      const data = sigCanvas.current.toDataURL("image/png");
      setSavedSignature(data);
      onChange(data); // pass to parent form

    //   // Download image locally
    //     const link = document.createElement("a");
    //     link.href = data;
    //     link.download = "signature.png";
    //     link.click();
    }
  };

  const modify = () => {
    setSavedSignature(null);
    sigCanvas.current?.clear();
  };

  return (
    <div className="border p-2 rounded-md">
      {!savedSignature ? (
        <>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ width: 500, height: 200, className: "bg-white" }}
          />
          <div className="flex gap-2 mt-2">
            <button type="button" onClick={clear} className="px-3 py-1 bg-gray-200 rounded">Effacer</button>
            <button type="button" onClick={save} className="px-3 py-1 bg-blue-500 text-white rounded">Enregistrer</button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <img src={savedSignature} alt="Signature enregistrée" className="border bg-white" />
          <button type="button" onClick={modify} className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded">
            Modifier
          </button>
        </div>
      )}
    </div>
  );
}
