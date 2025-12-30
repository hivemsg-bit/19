# Vercel Web Analytics Setup

This project has been configured with **Vercel Web Analytics** to track user interactions and page views.

## Overview

Vercel Web Analytics is integrated into this React + Vite application to monitor user behavior and website performance without impacting user experience.

## What's Been Added

### 1. Package Installation
The `@vercel/analytics` package has been added to the project dependencies:
- Version: `^1.4.0`
- Package: `@vercel/analytics`

### 2. React Component Integration
The `Analytics` component has been imported and added to the main `App.tsx` file:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <div className="App">
      {/* App content */}
      <Analytics />
    </div>
  );
}
```

The `<Analytics />` component is placed at the root level of the application to ensure tracking across all pages and routes.

## Prerequisites for Full Functionality

To fully utilize Vercel Web Analytics, you need:

1. **A Vercel Account**: Sign up at [vercel.com](https://vercel.com/signup) if you don't have one
2. **A Vercel Project**: This project should be connected to a Vercel deployment
3. **Web Analytics Enabled**: Enable Web Analytics in your Vercel project dashboard:
   - Go to your [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Click the **Analytics** tab
   - Click **Enable** in the dialog

> **Note**: Enabling Web Analytics will add new routes (scoped at `/_vercel/insights/*`) after your next deployment.

## Deployment Steps

### 1. Deploy to Vercel
Deploy your app using the Vercel CLI or by connecting your Git repository:

```bash
# Using Vercel CLI
vercel deploy

# Or connect your Git repository for automatic deployments
# from your main branch
```

### 2. Verify Installation
After deployment, verify that analytics is working:
- Open your deployed app in a browser
- Open the browser's Developer Tools (F12)
- Go to the **Network** tab
- You should see a request to `/_vercel/insights/view` when you visit any page

## Accessing Analytics Data

Once your app is deployed and has received visitor traffic:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click the **Analytics** tab
4. View metrics including:
   - Page views
   - Unique visitors
   - Top pages
   - Device types
   - Geographic data

After a few days of visitor data, you can start exploring and filtering the panels.

## Privacy & Data Compliance

Vercel Web Analytics complies with privacy standards:
- No personally identifiable information (PII) is collected
- GDPR and other privacy regulations are respected
- Data is anonymized and aggregated

For more details, see the [Privacy Policy Documentation](https://vercel.com/docs/analytics/privacy-policy).

## Advanced Features (Pro/Enterprise Plans)

Users on Pro and Enterprise Vercel plans can:
- Add **custom events** to track specific user interactions
- Track button clicks, form submissions, purchases, etc.
- Set up goals and funnels
- Create custom reports and dashboards

Example custom event tracking:

```tsx
import { track } from '@vercel/analytics';

function MyComponent() {
  const handleClick = () => {
    track('button_click', {
      button_name: 'signup',
      location: 'hero_section'
    });
    // ... rest of your code
  };

  return <button onClick={handleClick}>Sign Up</button>;
}
```

## Troubleshooting

### Analytics Not Showing Data
- Ensure Web Analytics is enabled in your Vercel project dashboard
- Verify deployment was successful
- Wait 5-10 minutes after first enabling analytics
- Check the Network tab for `/_vercel/insights/view` requests

### Local Development
- Analytics data is only collected in production deployments
- Local development with `npm run dev` won't show analytics data in the dashboard
- Use `npm run build && npm run preview` to test production mode locally

## Related Documentation

For more information about Vercel Web Analytics:
- [Vercel Analytics Package Documentation](/docs/analytics/package)
- [Custom Events Guide](/docs/analytics/custom-events)
- [Data Filtering Guide](/docs/analytics/filtering)
- [Limits and Pricing](/docs/analytics/limits-and-pricing)
- [Troubleshooting Guide](/docs/analytics/troubleshooting)

## Support

For issues or questions:
1. Check the [Troubleshooting Guide](/docs/analytics/troubleshooting)
2. Visit the [Vercel Documentation](https://vercel.com/docs)
3. Contact Vercel support through your dashboard
