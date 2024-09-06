export const formatUser = (user) => {
  if (!user.id || !user.code || !user.email) return;

  let sessionUser = sessionStorage.getItem("user");
  sessionUser = sessionUser ? JSON.parse(sessionUser) : null;

  let newUser = {};

  if (sessionUser) {
    newUser = {
      id: user.id || sessionUser.id,
      code: user.code || sessionUser.code,
      email: user.email || sessionUser.email,
      nickname: user.nickname || sessionUser.nickname,
      level: user.level || sessionUser.level,
      mileage: user.mileage || sessionUser.mileage,
      birth_year: user.birth_year || sessionUser.birth_year,
      profile_image: user.profile_image || sessionUser.profile_image,
      profile_text: user.profile_text || sessionUser.profile_text,
      rating_count: user.rating_count || sessionUser.rating_count,
      review_count: user.review_count || sessionUser.review_count,
      like_count: user.like_count || sessionUser.like_count,
      is_email_verify: user.is_email_verify || sessionUser.is_email_verify,
      is_marketing_agree: user.is_marketing_agree || sessionUser.is_marketing_agree,
    };
  } else {
    newUser = {
      id: user.id,
      code: user.code,
      email: user.email,
      nickname: user.nickname,
      level: user.level,
      mileage: user.mileage,
      birth_year: user.birth_year,
      profile_image: user.profile_image,
      profile_text: user.profile_text,
      rating_count: user.rating_count,
      review_count: user.review_count,
      like_count: user.like_count,
      is_email_verify: user.is_email_verify,
      is_marketing_agree: user.is_marketing_agree,
    };
  }

  return newUser;
};
