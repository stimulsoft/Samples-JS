using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;

namespace Demo
{
    public class StiEmailOptions
    {
        private string addressFrom = string.Empty;
        /// <summary>
        /// A System.String that contains the addresses of the recipients of the Email message.
        /// </summary>
        public string AddressFrom
        {
            get
            {
                return addressFrom;
            }
            set
            {
                addressFrom = value;
            }
        }

        private string addressTo = string.Empty;
        /// <summary>
        /// A System.String that contains the address of the sender of the Email message.
        /// </summary>
        public string AddressTo
        {
            get
            {
                return addressTo;
            }
            set
            {
                addressTo = value;
            }
        }

        private string subject = string.Empty;
        /// <summary>
        /// Gets or sets the subject line for the Email message.
        /// </summary>
        public string Subject
        {
            get
            {
                return subject;
            }
            set
            {
                subject = value;
            }
        }

        private string body = string.Empty;
        /// <summary>
        /// Gets or sets the message body.
        /// </summary>
        public string Body
        {
            get
            {
                return body;
            }
            set
            {
                body = value;
            }
        }

        private string host = "localhost";
        /// <summary>
        /// A System.String that contains the name or IP address of the host used for SMTP transactions.
        /// </summary>
        public string Host
        {
            get
            {
                return host;
            }
            set
            {
                host = value;
            }
        }

        private int port = 25;
        /// <summary>
        /// An System.Int32 greater than zero that contains the port to be used on host.
        /// </summary>
        public int Port
        {
            get
            {
                return port;
            }
            set
            {
                port = value;
            }
        }

        private string userName = string.Empty;
        /// <summary>
        /// The user name associated with the credentials.
        /// </summary>
        public string UserName
        {
            get
            {
                return userName;
            }
            set
            {
                userName = value;
            }
        }

        private string password = string.Empty;
        /// <summary>
        /// The password for the user name associated with the credentials.
        /// </summary>
        public string Password
        {
            get
            {
                return password;
            }
            set
            {
                password = value;
            }
        }

        private bool enableSsl = true;
        /// <summary>
        /// Specify whether the System.Net.Mail.SmtpClient uses Secure Sockets Layer (SSL) to encrypt the connection.
        /// </summary>
        public bool EnableSsl
        {
            get
            {
                return enableSsl;
            }
            set
            {
                enableSsl = value;
            }
        }

        private ArrayList cc = new ArrayList();
        /// <summary>
        ///  Sets the address collection that contains the carbon copy (CC) recipients for the Email message.
        /// </summary>
        public ArrayList CC
        {
            get
            {
                return cc;
            }
        }

        private ArrayList bcc = new ArrayList();
        /// <summary>
        /// Sets the address collection that contains the blind carbon copy (BCC) recipients for the Email message.
        /// </summary>
        public ArrayList BCC
        {
            get
            {
                return bcc;
            }
        }
    }
}
