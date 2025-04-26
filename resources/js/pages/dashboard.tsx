import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    images: Array<{
        id: number;
        filepath: string;
        created_at: string;
    }>;
}

export default function Dashboard({ images }: DashboardProps) {
    const { data, setData, post, processing, errors } = useForm({
        image: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('images.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-4">
                    <h2 className="text-xl font-bold mb-4">Upload Image</h2>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium">
                                Select Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                className="mt-1 block w-full"
                            />
                            {errors.image && <div className="text-red-600 text-sm mt-1">{errors.image}</div>}
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            disabled={processing}
                        >
                            {processing ? 'Uploading...' : 'Upload'}
                        </button>
                    </form>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-4">
                    <h2 className="text-xl font-bold mb-4">Uploaded Images</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">ID</th>
                                <th className="border border-gray-300 px-4 py-2">Image</th>
                                <th className="border border-gray-300 px-4 py-2">Uploaded At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {images.map((image) => (
                                <tr key={image.id}>
                                    <td className="border border-gray-300 px-4 py-2">{image.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img
                                            src={`/storage/${image.filepath}`}
                                            alt="Uploaded Image"
                                            className="h-16"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{image.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
