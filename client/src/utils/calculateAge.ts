function calculateAge(birthday?: string) {
  let age: number | null = null;
  if (birthday) {
    const birth = new Date(birthday);
    const today = new Date();
    age = today.getFullYear() - birth.getFullYear();

    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() < birth.getDate())
    ) {
      age = age - 1;
    }
  }

  return age;
}

export default calculateAge;
