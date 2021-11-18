package model

import (
	"bytes"
	"encoding/json"
	"net/textproto"
	"strings"
)

type PartFileHeader struct {
	ContentDisposition []string `json:"Content-Disposition"`
	ContentType        []string `json:"Content-Type"`
}

func NewPartFileHeader(header textproto.MIMEHeader) *PartFileHeader {
	part := &PartFileHeader{}
	v, e := json.Marshal(header)
	if e != nil || v == nil {
		return nil
	}
	jdec := json.NewDecoder(bytes.NewBuffer(v))
	e = jdec.Decode(part)
	if e != nil {
		return nil
	}
	return part
}

func (pfh *PartFileHeader) Restructure() {
	newArray := []string{}
	for _, head := range pfh.ContentDisposition {
		vals := strings.Split(head, ";")
		for _, v := range vals {
			newArray = append(newArray, strings.Trim(strings.Trim(v, "\""), " "))
		}
	}
	pfh.ContentDisposition = newArray
	newSlice := []string{}
	for _, head := range pfh.ContentType {
		vals := strings.Split(head, ";")
		for _, v := range vals {
			newSlice = append(newSlice, strings.Trim(strings.Trim(v, "\""), " "))
		}
	}
	pfh.ContentType = newSlice
}

func (pdf *PartFileHeader) GetFileName() string {
	for _, b := range pdf.ContentDisposition {
		if strings.HasPrefix(b, "filename") {
			return strings.Trim((strings.Split(b, "="))[1], "\"")
		}
	}
	return ""
}

func (pdf *PartFileHeader) GetFileKeyName() string {
	for _, b := range pdf.ContentDisposition {
		if strings.HasPrefix(b, "name") {
			return strings.Trim((strings.Split(b, "="))[1], "\"")
		}
	}
	return ""
}

func (pdf *PartFileHeader) GetContentType() string {
	if len(pdf.ContentType) == 0 {
		return ""
	}
	return pdf.ContentType[0]
}
