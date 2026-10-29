import { defineField, defineType } from 'sanity'

export const reviewSchema = defineType({
  name: 'review',
  title: 'Hotel Review',
  type: 'document',
  fields: [
    defineField({ name: 'hotelName', title: 'Hotel Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'hotelName' }, validation: (r) => r.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'regionLabel', title: 'Region Label', type: 'string', description: 'e.g. "Middle East · Saudi Arabia"' }),
    defineField({ name: 'locationLabel', title: 'Location Label', type: 'string', description: 'e.g. "Red Sea, Saudi Arabia"' }),

    // Location references
    defineField({ name: 'country', title: 'Country', type: 'reference', to: [{ type: 'country' }] }),
    defineField({ name: 'region', title: 'Region', type: 'reference', to: [{ type: 'region' }] }),
    defineField({ name: 'city', title: 'City', type: 'reference', to: [{ type: 'city' }] }),
    defineField({
      name: 'experiences',
      title: 'Experiences',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['Beach', 'Safari', 'Ski', 'Overwater', 'Eco', 'Wellness', 'Adults-Only', 'Honeymoon', 'Family', 'Heritage', 'City', 'Desert', 'Surf', 'Wilderness', 'Wine Country', 'Boutique'],
      },
    }),

    // Media
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'photoStrip', title: 'Photo Strip', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'photoStripUrls', title: 'Photo Strip URLs (external)', type: 'array', of: [{ type: 'string' }] }),

    // Author
    defineField({ name: 'authorName', title: 'Author Name', type: 'string' }),
    defineField({ name: 'authorRole', title: 'Author Role', type: 'string' }),
    defineField({ name: 'authorPhoto', title: 'Author Photo', type: 'image', options: { hotspot: true } }),

    // Dates
    defineField({ name: 'publishedDate', title: 'Published Date', type: 'date' }),
    defineField({ name: 'updatedDate', title: 'Updated Date', type: 'date' }),

    // Collab
    defineField({ name: 'isCollaboration', title: 'Is Collaboration?', type: 'boolean' }),
    defineField({ name: 'collaboratorName', title: 'Collaborator Name', type: 'string' }),
    defineField({ name: 'collaboratorHandle', title: 'Collaborator Instagram Handle', type: 'string' }),
    defineField({ name: 'collaboratorPhoto', title: 'Collaborator Photo', type: 'image' }),

    // Content
    defineField({ name: 'body', title: 'Body Content', type: 'array', of: [
      {
        type: 'block',
        // Keep the standard styles and add the intro style already used by reviews.
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'Heading 1', value: 'h1' },
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Heading 5', value: 'h5' },
          { title: 'Heading 6', value: 'h6' },
          { title: 'Quote', value: 'blockquote' },
          { title: 'Introduction', value: 'intro' },
        ],
      },
      {
        type: 'image', options: { hotspot: true },
        fields: [{ name: 'caption', title: 'Caption', type: 'string' }],
      },
      // These names and fields mirror the existing PortableText renderer and
      // stored review content. Registering them does not migrate any documents.
      {
        name: 'sectionHeader', title: 'Section Header', type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'heading', title: 'Heading', type: 'string' },
          { name: 'headingItalic', title: 'Italic Heading Suffix', type: 'string' },
        ],
        preview: { select: { title: 'heading', subtitle: 'label' } },
      },
      {
        name: 'pullQuote', title: 'Pull Quote', type: 'object',
        fields: [
          { name: 'text', title: 'Text', type: 'text' },
          { name: 'cite', title: 'Citation', type: 'string' },
        ],
        preview: { select: { title: 'text', subtitle: 'cite' } },
      },
      {
        name: 'photoGrid', title: 'Photo Grid', type: 'object',
        fields: [
          { name: 'layout', title: 'Layout', type: 'string', options: { list: [
            { title: 'Single Image', value: 'single' },
            { title: 'Two Columns', value: '2col' },
            { title: 'Three Columns', value: '3col' },
            { title: 'Four Columns', value: '4col' },
          ] } },
          { name: 'images', title: 'Images', type: 'array', of: [{
            type: 'object',
            fields: [
              // Existing reviews use both site-relative paths and absolute URLs.
              { name: 'url', title: 'Image URL or Local Path', type: 'string' },
              { name: 'alt', title: 'Alternative Text', type: 'string' },
              { name: 'caption', title: 'Caption', type: 'string' },
            ],
            preview: { select: { title: 'alt', subtitle: 'url' } },
          }] },
        ],
        preview: { select: { subtitle: 'layout' }, prepare: ({ subtitle }) => ({ title: 'Photo Grid', subtitle }) },
      },
      {
        name: 'highlightBox', title: 'Highlights', type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'items', title: 'Items', type: 'array', of: [{
            type: 'object', fields: [
              { name: 'bold', title: 'Bold Prefix', type: 'string' },
              { name: 'text', title: 'Text', type: 'text' },
            ],
            preview: { select: { title: 'bold', subtitle: 'text' } },
          }] },
        ],
        preview: { select: { title: 'title' } },
      },
      {
        name: 'diningGrid', title: 'Dining Grid', type: 'object',
        fields: [
          { name: 'items', title: 'Restaurants', type: 'array', of: [{
            type: 'object', fields: [
              { name: 'name', title: 'Name', type: 'string' },
              { name: 'cuisine', title: 'Cuisine', type: 'string' },
              { name: 'description', title: 'Description', type: 'text' },
              { name: 'bestFor', title: 'Best For', type: 'string' },
            ],
            preview: { select: { title: 'name', subtitle: 'cuisine' } },
          }] },
        ],
        preview: { prepare: () => ({ title: 'Dining Grid' }) },
      },
      {
        name: 'noteBox', title: 'Note', type: 'object',
        fields: [
          { name: 'boldPrefix', title: 'Bold Prefix', type: 'string' },
          { name: 'text', title: 'Text', type: 'text' },
        ],
        preview: { select: { title: 'text', subtitle: 'boldPrefix' } },
      },
      {
        name: 'ntkGrid', title: 'Need to Know Grid', type: 'object',
        fields: [
          { name: 'items', title: 'Details', type: 'array', of: [{
            type: 'object', fields: [
              { name: 'label', title: 'Label', type: 'string' },
              { name: 'value', title: 'Value', type: 'text' },
            ],
            preview: { select: { title: 'label', subtitle: 'value' } },
          }] },
        ],
        preview: { prepare: () => ({ title: 'Need to Know Grid' }) },
      },
      {
        name: 'verdict', title: 'Verdict', type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'text', title: 'Text', type: 'text' },
        ],
        preview: { select: { title: 'title', subtitle: 'label' } },
      },
      {
        name: 'tagRow', title: 'Tags', type: 'object',
        fields: [{ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }],
        preview: { prepare: () => ({ title: 'Tags' }) },
      },
      {
        name: 'collabFooter', title: 'Collaboration Footer', type: 'object',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'photoUrl', title: 'Photo URL or Local Path', type: 'string' },
          { name: 'text', title: 'Text', type: 'text' },
          { name: 'handle', title: 'Instagram Handle', type: 'string' },
          { name: 'email', title: 'Email', type: 'string' },
        ],
        preview: { select: { title: 'name', subtitle: 'handle' } },
      },
      {
        name: 'scoreBreakdown', title: 'Score Breakdown', type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'items', title: 'Scores', type: 'array', of: [{
            type: 'object', fields: [
              { name: 'category', title: 'Category', type: 'string' },
              { name: 'score', title: 'Score', type: 'number' },
            ],
            preview: { select: { title: 'category' } },
          }] },
        ],
        preview: { select: { title: 'title' } },
      },
    ]}),

    // Sidebar facts
    defineField({ name: 'nightlyRate', title: 'Nightly Rate', type: 'string' }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'villaCount', title: 'Villa / Room Count', type: 'string' }),
    defineField({ name: 'diningInfo', title: 'Dining Info', type: 'string' }),
    defineField({ name: 'bookingUrl', title: 'Booking URL', type: 'url' }),

    // Score
    defineField({ name: 'score', title: 'Score (out of 10)', type: 'number' }),

    // Sidebar detail rows
    defineField({ name: 'sidebarDetails', title: 'Sidebar Details', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'key', title: 'Label', type: 'string' },
        { name: 'value', title: 'Value', type: 'string' },
      ],
      preview: { select: { title: 'key', subtitle: 'value' } },
    }]}),

    // Relations
    defineField({ name: 'relatedReviews', title: 'Related Reviews', type: 'array', of: [{ type: 'reference', to: [{ type: 'review' }] }] }),

    // SEO
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'heroImageUrl', title: 'Hero Image URL (external fallback)', type: 'url' }),
  ],
  preview: {
    select: { title: 'hotelName', subtitle: 'locationLabel', media: 'heroImage' },
  },
})
