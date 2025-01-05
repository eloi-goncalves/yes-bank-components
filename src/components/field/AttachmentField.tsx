import React, { useState } from "react";
import { AttachmentFieldProps } from "../../types/field/AttachmenFieldProps";

const AttachmentField:React.FC<AttachmentFieldProps> = ({ urlUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFile(fileList[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Selecione um arquivo");
      return;
    }

    const formData = new FormData();

    for (const key in file) {
      if (file.hasOwnProperty(key)) {
        const selectedFile: File = file[key]; 
        formData.append('file', selectedFile); // append the file to FormData
      }
    }
    

    setStatus("Enviando arquivo...");

    try {
      const response = await fetch(urlUpload, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(`Upload concluído: ${data.uploadedFiles.join(', ')}`);
      } else {
        const error = await response.json().catch(() => ({
          error: 'Erro desconhecido no backend.',
        }));
        setStatus(`Erro no upload: ${error.error}`);
      }
    } catch (error) {
      setStatus('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div>
      <label>Envio de Arquivos</label>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Enviar</button>
      <p>{status}</p>
    </div>
  )
}

export default AttachmentField;