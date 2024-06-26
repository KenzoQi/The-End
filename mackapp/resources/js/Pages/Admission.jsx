import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Admission() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        enrollmentid: '',
        academicYearTerm: '',
        department: '',
        course: '',
        lastName: '',
        firstName: '',
        mi: '',
        gender: '',
        date_of_birth: '',
        civil_status: '',
        nationality: '',
        religion: '',
        email: '',
        contactNumber: '',
        address: '',
    });
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [checkingDuplicate, setCheckingDuplicate] = useState(false);

    const handleNext = () => {
        if (validateStep()) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const departments = {
        'College of Engineering and Architecture': ['Engineering', 'Architecture'],
        'College of Information Technology and Computing': ['Information Technology', 'Computer Science'],
        'College of Nursing': ['Nursing']
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
            ...(id === 'department' && { course: '' }) // Reset the course if department changes
        }));
    };

    const validateStep = () => {
        const requiredFieldsStep1 = ['academicYearTerm', 'department', 'course'];
        const requiredFieldsStep2 = ['lastName', 'firstName', 'gender', 'date_of_birth', 'nationality', 'email', 'contactNumber', 'address','religion','civil_status'];

        let requiredFields = [];
        if (step === 1) requiredFields = requiredFieldsStep1;
        if (step === 2) requiredFields = requiredFieldsStep2;

        for (let field of requiredFields) {
            if (!formData[field]) {
                alert(`Please fill out the ${field} field.`);
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async () => {
        setCheckingDuplicate(true);
        const response = await fetch('/check-duplicate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
            }),
        });

        const result = await response.json();
        setCheckingDuplicate(false);
        setIsDuplicate(result.exists);

        if (!result.exists) {
            alert('Form submitted successfully!');
            // Add your form submission logic here
        }
    };

    return (
        <>
            <Head title="Admission - Mackenzie University" />
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-6">Admission Page</h1>
                <p className="text-lg mb-6">
                    Welcome to the Admission page of Mackenzie University. Here you can find all the information you need to apply.
                </p>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Please complete the form for your application:</h2>
                    {step === 1 && (
                        <form>
                            <div className="grid grid-cols-1 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="academicYearTerm">Academic Year and Term</label>
                                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="academicYearTerm" value={formData.academicYearTerm} onChange={handleChange}>
                                        <option value="">Select Academic Year</option>
                                        <option value="2024-2025 First Semester">2024-2025 First Semester</option>
                                        <option value="2024-2025 Mid-year">2024-2025 Mid-year</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="department">Department</label>
                                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="department" value={formData.department} onChange={handleChange}>
                                        <option value="">Select College Department</option>
                                        {Object.keys(departments).map((dept) => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="course">Course</label>
                                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="course" value={formData.course} onChange={handleChange}>
                                        <option value="">Select Course</option>
                                        {formData.department && departments[formData.department].map((course) => (
                                            <option key={course} value={course}>{course}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button type="button" className="flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={() => {
                                    window.history.back();
                                }}>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back
                                </button>
                                <button type="button" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleNext}>
                                    Next
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    )}
                    {step === 2 && (
                        <form>
                            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">First Name</label>
                                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">Last Name</label>
                                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="mi">Middle Initial</label>
                                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="mi" value={formData.mi} onChange={handleChange} placeholder="MI" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="gender">Gender</label>
                                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="gender" value={formData.gender} onChange={handleChange}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="date_of_birth">Date of Birth</label>
                                    <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="civil_status">Civil Status</label>
                                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="civil_status" value={formData.civil_status} onChange={handleChange}>
                                        <option value="">Select Civil Status</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Widowed">Widowed</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="nationality">Nationality</label>
                                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nationality" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="religion">Religion</label>
                                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="religion" value={formData.religion} onChange={handleChange} placeholder="Religion" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                                    <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="contactNumber">Contact Number</label>
                                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="address">Address</label>
                                    <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="address" value={formData.address} onChange={handleChange} placeholder="Address" rows="3" />
                                </div>
                            </div>
                            {isDuplicate && <div className="text-red-500">A record with this name and email already exists.</div>}
                            <div className="flex justify-between">
                                <button type="button" className="flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={handleBack}>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back
                                </button>
                                <button type="button" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSubmit} disabled={checkingDuplicate}>
                                    {checkingDuplicate ? 'Checking...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}
