import GenericPage from "@/components/GenericPage";
import BlogListing from "@/components/blog/BlogListing";

export default function BlogPage() {
  return (
    <GenericPage title="Design Journal">
      <p className="text-brand-dark/75 font-light text-xl mb-12 -mt-6 max-w-2xl leading-relaxed">
        Insights, masterclass guides, and curation narratives from our global network of master craftsmen and interior designers.
      </p>
      <BlogListing />
    </GenericPage>
  );
}
