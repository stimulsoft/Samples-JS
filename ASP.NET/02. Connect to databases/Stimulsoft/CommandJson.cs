using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization.Json;
using System.Runtime.Serialization;

[DataContract]
public class CommandJson
{
    [DataMember(Name = "command")]
    public string Command { get; set; }

    [DataMember(Name = "connectionString")]
    public string ConnectionString { get; set; }

    [DataMember(Name = "database")]
    public string Database { get; set; }

    [DataMember(Name = "event")]
    public string Event { get; set; }

    [DataMember(Name = "preventDefault")]
    public bool PreventDefault { get; set; }

    [DataMember(Name = "rnd")]
    public double Rnd { get; set; }

     [DataMember(Name = "queryString")]
    public string QueryString { get; set; }
}