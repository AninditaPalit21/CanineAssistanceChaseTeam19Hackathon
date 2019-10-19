import smtplib
conn = smtplib.SMTP('smtp.gmail.com', 587)
conn.ehlo()
conn.starttls()

conn.login('mshei1824@gmail.com', 'yowh qvlj ixmf acne')


conn.sendmail('mshei1824@gmail.com', 'welovedogs123456@gmail,com',

              'Subject: hello world')

print("Sent")
conn.quit()