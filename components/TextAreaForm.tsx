'use client';

import { ChangeEvent, useState } from "react";
import PrimaryButton from "./common/PrimaryButton";


type TextAreaFormProps = {
    onSubmit: (value: string) => void;
    placeholder?: string;
    buttonText?: string;
    initialValue?: string;
    loading?: boolean;
  };
  



export default function TextAreaForm({onSubmit ,placeholder = 'Enter text...',buttonText='Submit', initialValue ='',  loading = false} : TextAreaFormProps){
    const [resume , setResume] = useState<string>(initialValue);
    const handleChange  = (e:ChangeEvent<HTMLTextAreaElement>) =>{
        setResume(e.target.value);
     }
     
     const handleSubmit = (e:ChangeEvent<HTMLFormElement>) =>{
         e.preventDefault();
         onSubmit(resume);
     }
  
     return (
        <form onSubmit={handleSubmit} className="space-y-4 m-10 md:flex md:flex-col">
          <textarea
            value={resume}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full   p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={6}
          />
          <PrimaryButton disabled={loading} className="md:w-[20vw]">
          {loading ? "Loading..." : buttonText}
          </PrimaryButton>
        </form>

      );
    }

