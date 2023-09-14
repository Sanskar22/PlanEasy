import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BookingWidget from './BookingWidget';
import PlaceGallery from './PlaceGallery';
import AddressLink from './AddressLink';

export default function SinglePlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showPhotos, setShowPhotos] = useState(false);

    const getFilename = function (str) {
        return str.substring(str.lastIndexOf('/') + 1);
    }


    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return '';

    if (showPhotos) {
        return (
            <div className='absolute inset-0 bg-black text-white min-w-full min-h-screen'>
                <div className='p-8 bg-black grid gap-4 '>
                    <div>
                        <h2 className='text-3xl mr-48'>Photos of {place.title}</h2>
                        <button onClick={() => setShowPhotos(false)} className='flex gap-1 right-12 top-8 py-2 px-4 rounded-2xl fixed shadow shadow-black bg-white text-black'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                            Close Images
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => {
                        <div>
                            <img className='z-10' src={'http://localhost:5000/uploads/' + getFilename(photo)} alt="" />
                        </div>
                    })}
                </div>

            </div>
        )
    }



    return (
        <div className='bg-gray-100 -mx-8 px-8 pt-8'>
            <h1 className='text-3xl '>{place.title}</h1>
            <AddressLink >{place.address}</AddressLink>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img onClick={() => setShowPhotos(true)} className='aspect-square cursor-pointer object-cover' src={'http://localhost:5000/uploads/' + getFilename(place.photos?.[0])} alt="" />
                            </div>
                        )}
                    </div>
                    <div className='grid'>
                        {place.photos?.[1] && (
                            <img onClick={() => setShowPhotos(true)} className='aspect-square cursor-pointer object-cover' src={'http://localhost:5000/uploads/' + getFilename(place.photos?.[1])} alt="" />
                        )}
                        <div className='overflow-hidden'>
                            {place.photos?.[2] && (
                                <img onClick={() => setShowPhotos(true)} className='aspect-square cursor-pointer object-cover' src={'http://localhost:5000/uploads/' + getFilename(place.photos?.[2])} alt="" />
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowPhotos(true)} className='flex gap-1 absolute bottom-2 right-2 px-4 py-2 bg-white rounded-2xl shadow-md  shadow-gray-500  '>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                    </svg>
                    Show more images
                </button>
            </div>
            <div className='mt-8 mb-4 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn}<br />
                    Check-out: {place.checkOut}<br />
                    Max number of guests: {place.maxGuests}

                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className="bg-white -mx-8 p-8 border-t">
                <div>
                    <h2 className="font-semibold text-2xl mt-8">Extra Info</h2>
                </div>
                <div className='text-sm text-gray-700 leading-5 mb-4 mt-2'>
                    {place.extraInfo}
                </div>
            </div>
        </div>
    )
}

