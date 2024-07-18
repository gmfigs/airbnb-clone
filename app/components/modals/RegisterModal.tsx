'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import Modal from "./Modal";
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";

const RegisterModal = () => {
    const RegisterModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                RegisterModal.onClose();
            })
            .catch((error) => {
                toast.error('Something went wrong');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Airbnb"
                subtitle="Create an account"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />

            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => {}}
            />

            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <div className="
                text-neutral-500
                text-center
                mt-4
                font-light"
            >
                <div className="justify-center flex flex-row items-center gap-2">
                    Already have an account?
                    <div className="
                        text-neutgral-800
                        cursor-pointer
                        underline
                        hover:text-black
                    ">
                        Login
                    </div>
                </div>

            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={RegisterModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={RegisterModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;