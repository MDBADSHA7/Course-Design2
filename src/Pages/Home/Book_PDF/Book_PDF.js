import React from "react";
import "./Book_PDF.css";
import image1 from '../Book_PDF/computer-Graphics.png'
import image2 from '../Book_PDF/android.png'
import image3 from '../Book_PDF/android-Studio-Development.png'
import image4 from '../Book_PDF/HSK-2.png'
import image5 from '../Book_PDF/HSK-1.png'
import image6 from '../Book_PDF/HSK-3.png'

import { CardCvcElement } from "@stripe/react-stripe-js";

const Book_PDF = () => {
  return (
    <div>
      <h1 className="lg:text-4xl md:text-3xl text-2xl font-header font-bold text-center mt-10 mb-10 ">Please choose a PDF book for reading</h1>
      {/* Add Card */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pl-5 pr-5">
<div>
   {/* Add 1st Card */}
   <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={image1} alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Computer Graphics!</h2>
    <p>This Computer Graphics courese for NJUPT students.</p>
    <div className="card-actions">
      <button className="btn btn-primary"><a href="https://math.hws.edu/eck/cs424/downloads/graphicsbook-linked.pdf">Open the book</a></button>
    </div>
  </div>
</div>
{/* End 1st Card */}
</div>

<div>
   {/* Add 1st Card */}
   <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={image2} alt="Shoes" className="rounded-xl hight" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Android Studio</h2>
    <p>Learn it from Huang Rui (Teacher of NJUPT). We learn it for course design-2</p>
    <div className="card-actions">
    <button className="btn btn-primary"><a href="https://www-di.inf.puc-rio.br/~endler/courses/Android/Books/LivroProgrammingAndroid.pdf">Open the book</a></button>
    </div>
  </div>
</div>
{/* End 1st Card */}
</div>
<div>
   {/* Add 1st Card */}
   <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={image3} alt="Shoes" className="rounded-xl hight" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Android Studio Development!</h2>
    <p>It is a Compolsary course of NJUPT. It is one of the best course for CST.</p>
    <div className="card-actions">
    <button className="btn btn-primary"><a href="https://www.ebookfrenzy.com/pdf_previews/AndroidStudioEssentialsPreview.pdf">Open the book</a></button>
    </div>
  </div>
</div>
{/* End 1st Card */}
</div>
<div>
   {/* Add 1st Card */}
   <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={image5} alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">HSK-1 Vocabulary</h2>
    <p>It is compolsary course for every international students of NJUPT. It is HSK Level-1</p>
    <div className="card-actions">
    <button className="btn btn-primary"><a href="https://hewgill.com/hsk/hsk1.pdf">Open the book</a></button>
    </div>
  </div>
</div>
{/* End 1st Card */}
</div>

<div>
   {/* Add 1st Card */}
   <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={image4} alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">HSK-2 Vocabulary</h2>
    <p>It is compolsary course for every international students of NJUPT. It is HSK Level-2</p>
    <div className="card-actions">
    <button className="btn btn-primary"><a href="https://hewgill.com/hsk/hsk2.pdf">Open the book</a></button>
    </div>
  </div>
</div>
{/* End 1st Card */}
</div>

{/* Add 2nd Card */}

<div>

<div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={image6} alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">HSK-3 Vocabulary</h2>
    <p>It is compolsary course for every international students of NJUPT. It is HSK Level-3</p>
    <div className="card-actions">
    <button className="btn btn-primary"><a href="https://hewgill.com/hsk/hsk3.pdf">Open the book</a></button>
    </div>
  </div>
</div>
</div>

</div>

<hr></hr>
      </div>
  );
};

export default Book_PDF;
