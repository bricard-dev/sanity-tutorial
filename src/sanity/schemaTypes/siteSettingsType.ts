import { ControlsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: ControlsIcon,
  groups: [
    { name: 'generalSettings', title: 'Générale' },
    { name: 'headerSettings', title: 'Haut de page' },
  ],
  fields: [
    defineField({
      group: 'generalSettings',
      name: 'homePage',
      type: 'reference',
      to: [{ type: 'page' }],
    }),
    defineField({
      group: 'headerSettings',
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'élément de navigation',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'page',
              title: 'Page',
              type: 'reference',
              to: [{ type: 'page' }],
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
