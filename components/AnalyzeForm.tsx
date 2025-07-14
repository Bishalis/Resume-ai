'use client';

import { ChangeEvent, useState } from "react";
import PrimaryButton from "./common/PrimaryButton";





export default function TextAreaForm(){
    const [text , setText] = useState<string>('');
    const handleChange  = (e:ChangeEvent<HTMLTextAreaElement>) =>{
        setText(e.target.value);
     }
     
     const handleSubmit = (e:ChangeEvent<HTMLFormElement>) =>{
         e.preventDefault();
         console.log('submitted text');
     }
  
     return (
        <form onSubmit={handleSubmit} className="space-y-4 m-10">
          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Enter text to analyze..."
            className="w-full md:w-50vw  p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={6}
          />
          <PrimaryButton type="submit">
            Analyze Text
          </PrimaryButton>
        </form>

      );
    }
