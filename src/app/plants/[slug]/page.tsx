import React from 'react';
import PlantCard from './PlantCard';
import { getPlantById } from '@/actions/plant.action';
import { stackServerApp } from '@/stack';
import { SignIn } from '@stackframe/stack';

interface MetadataProps {
  params: { slug: string };
}

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: MetadataProps) {
  const [id] = params.slug.split("--");
  const plant = await getPlantById(id);
  
  return {
    title: plant?.name || "Plant Details",
    description: plant?.description || "Plant details page",
  };
}

async function Page({ params }: PageProps) {
  const user = await stackServerApp.getUser();
  const [id] = params.slug.split("--");
  const plant = await getPlantById(id);

  if (!user) {
    return <SignIn />;
  }

  if (!plant) {
    return <div>Plant not found</div>;
  }

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <PlantCard plant={plant} />
      </div>
    </div>
  );
}

export default Page;