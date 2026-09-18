# BiziK

כרטיסי ביקור עסקיים. לקוח בריאקט, שרת באקספרס.

תיקיות:

`BiziK-Client`

`BiziK-Server`

## מה צריך במחשב

- נוד
- חיבור למסד נתונים מסוג מונגו

## שרת

1. להיכנס לתיקייה:

```bash
cd BiziK-Server
npm install
```

2. ליצור קובץ סביבה בשם:

`.env`

שדות נדרשים (בלי לשתף ערכים אמיתיים):

`db`

`secretKey`

אופציונלי:

`PORT`

ברירת מחדל לפורט:

`8000`

3. להריץ:

```bash
npm start
```

נקודות קצה:

`/api/register`

`/api/login`

`/api/profile`

`/api/cards`

## לקוח

1. להיכנס לתיקייה:

```bash
cd BiziK-Client
npm install
```

2. כתובת השרת המקומי כבר מוגדרת בקובץ:

`.env`

ערך לדוגמה:

`REACT_APP_API=http://localhost:8000/api/`

3. להריץ:

```bash
npm start
```

הלקוח נפתח בפורט ברירת המחדל של ריאקט (בדרך כלל 3000). קודם להרים את השרת.
