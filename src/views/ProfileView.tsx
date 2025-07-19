import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import ErrorMessage from '../components/ErrorMessage'
import { ProfileForm, User } from '../types'
import { updateProfile, uploadImage } from '../api/DevTreeAPI'

export default function ProfileView() {
    const queryClient = useQueryClient()
    const data: User = queryClient.getQueryData(['user'])!

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
        defaultValues: {
            handle: data.handle,
            description: data.description
        }
    })

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    image: data
                }
            })
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            uploadImageMutation.mutate(e.target.files[0])
        }
    }

    const handleUserProfileForm = (formData: ProfileForm) => {
        const user: User = queryClient.getQueryData(['user'])!
        user.description = formData.description
        user.handle = formData.handle
        updateProfileMutation.mutate(user)
    }

    return (
        <form
            onSubmit={handleSubmit(handleUserProfileForm)}
            className="bg-white p-10 rounded-2xl shadow-md space-y-6 max-w-xl mx-auto"
        >
            <legend className="text-3xl font-bold text-slate-800 text-center mb-4">
                Editar Información
            </legend>

            {/* Handle */}
            <div className="space-y-1">
                <label
                    htmlFor="handle"
                    className="block text-sm font-medium text-slate-700"
                >
                    Nombre de Usuario
                </label>
                <input
                    type="text"
                    id="handle"
                    className="w-full rounded-lg border border-gray-300 bg-slate-50 p-3 text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    placeholder="Ej. @usuario123"
                    {...register('handle', {
                        required: 'El Nombre de Usuario es obligatorio',
                    })}
                />
                {errors.handle && (
                    <ErrorMessage>{errors.handle.message}</ErrorMessage>
                )}
            </div>

            {/* Descripción */}
            <div className="space-y-1">
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-slate-700"
                >
                    Descripción
                </label>
                <textarea
                    id="description"
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 bg-slate-50 p-3 text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    placeholder="Una breve descripción sobre ti"
                    {...register('description', {
                        required: 'La Descripción es obligatoria',
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>

            {/* Imagen */}
            <div className="space-y-1">
                <label
                    htmlFor="image"
                    className="block text-sm font-medium text-slate-700"
                >
                    Imagen de Perfil
                </label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="w-full rounded-lg border border-gray-300 bg-slate-50 p-2 text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-100 file:text-cyan-700 hover:file:bg-cyan-200 transition"
                    onChange={handleChange}
                />
            </div>

            {/* Botón */}
            <input
                type="submit"
                value="Guardar Cambios"
                className="w-full py-3 bg-cyan-500 text-white font-bold uppercase rounded-lg hover:bg-cyan-600 transition duration-200 cursor-pointer text-lg"
            />
        </form>
    )

}