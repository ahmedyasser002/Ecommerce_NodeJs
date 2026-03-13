import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { userModel } from "../Models/User.js";

export const setupPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          let user = await userModel.findOne({ email });

          if (!user) {
            user = await userModel.create({
              name: profile.displayName,
              email: email,
              password: "google-login",
              isConfirmed: true,
              image: profile.photos[0].value,
              googleId: profile.id,
              address: { country: "Unknown", city: "Unknown", street: "Unknown" } // لتجنب خطأ address
            });
          } else {
            user.name = profile.displayName;
            user.image = profile.photos[0].value;
            user.googleId = profile.id;
            await user.save();
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};