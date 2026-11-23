# Hospicare

Hospital management web app (MERN): patients book appointments, and admins manage doctors, appointments and messages from a dashboard.

## Credit

This project is based on [MERN-Stack-Hospital-Management-System-Web-Application](https://github.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application) by [Zeeshu911](https://github.com/Zeeshu911), with a later fix by [ZeeshuCoder](https://github.com/ZeeshuCoder). The original application is their work, and its repository does not include a license.

**What I added:**

- Dockerfiles for the backend, frontend and dashboard
- GitHub Actions pipeline to test, build and publish images
- Configurable API address, clearer connection errors, and real dashboard counts
- Optional Cloudinary: doctors can be added without image upload configured
- Environment-based admin seed script, and config loading that works from any directory

## Structure

| Folder | Contents |
|---|---|
| `backend/` | Express API, MongoDB models, JWT auth |
| `frontend/` | Patient site (React, Vite) |
| `dashboard/` | Admin dashboard (React, Vite) |

## Run locally

Use Node 18, the version used in CI. The current dependencies fail to load on Node 26.

```bash
cd backend
cp config.env.example config.env   # fill in the values
npm install
npm run dev
```

In separate terminals, run `npm install && npm run dev` in `frontend/` and `dashboard/`. To create the first admin, fill in the `ADMIN_*` values and run `node seedAdmins.js` in `backend/`.

## Tests

`npm test` in `backend/` covers error handling and cookie settings.

## Deploying

Set `VITE_API_URL` when building `frontend/` and `dashboard/`. If they are on a different domain from the API, also set `COOKIE_CROSS_SITE=true` on the API and serve everything over https.
